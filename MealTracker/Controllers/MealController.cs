﻿using Mealtracker.Repositories;
using MealTracker.Models;
using MealTracker.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace MealTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly IMealRepository _mealRepository;

        private readonly IUserProfileRepository _userProfileRepository;
        public MealController(IMealRepository mealRepository, IUserProfileRepository userProfileRepository)
        {
            _mealRepository = mealRepository;
            _userProfileRepository = userProfileRepository;


        }

        [HttpGet("{date}")]
        public IActionResult GetCurrentUserMeals(DateTime date)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

            var meals = _mealRepository.GetAllMealsByUserId(user.Id, date);
            { return Ok(meals); }
        }

        [HttpPost]
        public IActionResult CreateMeal(MealIngredients meal)
        {
            try
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

                meal.UserProfileId = user.Id;

                _mealRepository.AddMeal(meal);
                return Ok(meal);
            }
            catch (Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMeal(int id)
        {
            try
            {
                _mealRepository.DeleteMeal(id);
                return Ok();

            }
            catch(Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
