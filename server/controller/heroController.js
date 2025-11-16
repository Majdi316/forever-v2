//TODO Models
import { Hero } from "../models/Hero.js";
//TODO Functions
import { validateHero } from "../validation/service/heroService.js";
import { validateUpdateHero } from "../validation/service/updateHeroService.js";
/**-------------------------------------------------
 * @desc  Create New Hero Section 
 * @route  /hero
 * @method  POST
 * @access private (Only Manager)
 ---------------------------------------------------*/
//todo ------------ create new hero section --------
const createNewHeroSectionController = async (req, res) => {
  const newHero = req.body;
  const user = req.user;
  try {
    //! just manager can create hero section
    if (!user.isManager) {
      return res.status(403).json({
        success: false,
        message: "Only Admin Can Create A New Hero",
      });
    }
    //!--------validate user before creation-------------
    const { error } = validateHero(newHero);
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    //! check if have any hero (only one hero can created)
    const currentHero = await Hero.find();
    if (currentHero.length !== 0) {
      throw new Error("Only one hero section can created");
    }
    const hero = new Hero(newHero);
    await hero.save();
    res.status(201).json({
      success: true,
      message: "Hero Section Created Successfully !!",
      hero: hero,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  Get All Hero
 * @route  /hero
 * @method  GET
 * @access public 
 ---------------------------------------------------*/
//todo ------------ get hero --------
const getHeroController = async (req, res) => {
  try {
    const hero = await Hero.find();
    if (hero.length === 0) {
      res.status(404).json({
        success: false,
        message: "Not found any hero !!",
      });
    }
    res.status(200).json({
      success: true,
      message: "get data successfully",
      hero,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**-------------------------------------------------
 * @desc  Update Hero
 * @route  /hero/:id
 * @method  PUT
 * @access private (Only Manager)
 ---------------------------------------------------*/
//todo ------------ Update Hero --------
const updateHeroController = async (req, res) => {
  try {
    const { id: heroId } = req.params;
    const newHero = req.body;
    const user = req.user;
    //! check if hero is exist
    const isHeroExist = await Hero.findById(heroId);
    if (!isHeroExist) {
      res.status(404).json({
        success: false,
        message: "Hero section not found !!",
      });
    }
    //! only manager can update hero section
    if (!user.isManager) {
      return res.status(403).json({
        success: false,
        message: "Only Admin Can Create A New Hero",
      });
    }
    //!--------validate user before creation-------------
    const { error } = validateUpdateHero(newHero);
    if (error) {
      throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    const updatedHero = await Hero.findByIdAndUpdate(heroId, newHero, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Hero section updated successfully !!",
      hero: updatedHero,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export {
  createNewHeroSectionController,
  getHeroController,
  updateHeroController,
};
