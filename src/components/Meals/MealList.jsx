import React from "react";
import styles from "./MealList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Піца Пікантна",
    description:
      "моцарела, пікантна салямі, сир лазур, в’ялені помідори, томатний соус",
    price: 8.99,
  },
  {
    id: "m2",
    name: "Піца Соренто",
    description: "моцарела, шинка, крем-сир, пармезан, вершковий соус",
    price: 5.99,
  },
  {
    id: "m3",
    name: "Піца Цезар",
    description:
      "моцарела, курка запечена, пармезан, айсберг, помідори чері, перепелині яйця, соус цезар, вершковий соус",
    price: 7.99,
  },
  {
    id: "m4",
    name: "Піца Капрічіоза",
    description:
      "моцарела, шинка, помідори, шампіньйони, маслини, томатний соус",
    price: 6.99,
  },
];

function MealList() {
  const mealList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}

export default MealList;
