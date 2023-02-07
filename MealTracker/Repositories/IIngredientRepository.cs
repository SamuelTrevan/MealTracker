﻿using MealTracker.Models;
using System.Collections.Generic;

namespace MealTracker.Repositories
{
    public interface IIngredientRepository
    {
        List<Ingredient> GetAllIngredients();
        bool CheckIfExsists(string name);
        void AddIngredient(Ingredient ingredient);
    }
}