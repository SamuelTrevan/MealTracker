using MealTracker.Models;
using System.Collections.Generic;

namespace MealTracker.Repositories
{
    public interface IIngredientRepository
    {
        List<Ingredient> GetAllIngredients();
    }
}