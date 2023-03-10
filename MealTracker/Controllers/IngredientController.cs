using MealTracker.Models;
using MealTracker.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace MealTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientRepository _ingredientRepository;
        public IngredientController(IIngredientRepository ingredientRepository)
        {
            _ingredientRepository = ingredientRepository;
        }

        [HttpGet]
        public IActionResult GetAllIngredients()
        {
            var foods = _ingredientRepository.GetAllIngredients();
            { return Ok(foods); }
        }

        [HttpPost]
        public IActionResult Create(Ingredient ingredient)
        {
            try
            {
                if (!_ingredientRepository.CheckIfExsists(ingredient.Name))
                {
                    _ingredientRepository.AddIngredient(ingredient);
                    return Ok(ingredient);

                }
                return Conflict("This food already exists");

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet ("food/{id}")]
        public IActionResult GetFood(int id)
        {
            var food = _ingredientRepository.GetIngredientById(id);
            if (food == null)
            {
                return NotFound();
            }
            return Ok(food);

        }

        [HttpDelete("food/delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _ingredientRepository.DeleteIngredient(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict("This did not work");
            }
        }

        [HttpPut("food/Edit/{id}")]
        public IActionResult Edit(Ingredient ingredient)
        {
            try
            {
                _ingredientRepository.EditIngredient(ingredient);

                return Ok(ingredient);
            }
            catch (Exception ex)
            {
                return Conflict("This did not work");
            }
        }



    }
}
