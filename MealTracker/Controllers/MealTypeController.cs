using Mealtracker.Repositories;
using MealTracker.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MealTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealTypeController : ControllerBase
    {
        private readonly IMealTypeRepository _mealTypeRepository;
        public MealTypeController(IMealTypeRepository mealTypeRepository)
        {
            _mealTypeRepository = mealTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAllMealTypes()
        {
            var mealTypes = _mealTypeRepository.GetAllMealTypes();
            {
                return Ok(mealTypes);
            }
        }
    }
}
