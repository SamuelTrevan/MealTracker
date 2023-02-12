using MealTracker.Models;
using System;
using System.Collections.Generic;

namespace Mealtracker.Repositories
{
    public interface IMealRepository
    {
        UserMeals GetAllMealsByUserId(int id, DateTime date);
        void AddMeal(MealIngredients meal);

        void DeleteMeal(int id);
    }
}