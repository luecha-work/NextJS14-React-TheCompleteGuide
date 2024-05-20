import classes from "@/styles/meals-grid.module.css";
import MealItem from "./meal-item";

interface Meal {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

interface MealsGridProps {
  readonly meals: Meal[];
}

function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

export default MealsGrid;
