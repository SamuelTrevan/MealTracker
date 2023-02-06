namespace MealTracker.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int ServingSize { get; set; }
        public int Fat { get; set; }
        public int Protein { get; set; }
        public int Carbs { get; set; }
        public int Sodium { get; set; }

    }
}
