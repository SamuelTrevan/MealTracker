using MealTracker.Models;
using System;
using System.Collections.Generic;

namespace Mealtracker.Repositories
{
    public interface IMealRepository
    {
        UserMeals GetAllMealsByUserId(int id, string date);
        void AddMeal(MealIngredients meal);

        void DeleteMeal(int id);
        MealIngredients GetMealById(int id);

        void EditMeal(MealIngredients meal);
    }
}