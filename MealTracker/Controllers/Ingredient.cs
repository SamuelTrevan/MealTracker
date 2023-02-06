using MealTracker.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MealTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientRepository _ingredientRepository;
        public IngredientController(IIngredientRepository ingredientRepository)
        {
            _ingredientRepository= ingredientRepository;
        }
        [HttpGet]
        public IActionResult GetAllIngredients() 
        { 
            var foods = _ingredientRepository.GetAllIngredients();
            { return Ok(foods); }
        }
    }
}
