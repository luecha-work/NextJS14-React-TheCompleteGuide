import db from "./db";

export function getTrainings(): Training[] {
  const stmt = db.prepare("SELECT * FROM trainings");
  const trainings = stmt.all() as Training[];

  return trainings;
}
