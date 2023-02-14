using MealTracker.Models;
using System.Collections.Generic;

namespace MealTracker.Repositories
{
    public interface IMealTypeRepository
    {
        List<MealTypes> GetAllMealTypes();
    }
}