# Mina lappar

Exam 2 ToDoAppen

## Frågor om koden

### 1. State-hantering

> Hur håller din app reda på vilka uppgifter som finns och om de är klara? Vad händer med gränssnittet när datan uppdateras?

Min app sparar uppgifterna i en array med useState i hooken useTodos.
Varje uppgift är ett objekt med bland annat text, ett unikt id och "completed", som anger om den är klar.
När jag uppdaterar datan med "setTodos" renderar React om berörda komponenter så att listan, bockarna och knapparna visar det aktuella läget.

### 2.Oföränderlighet

> Varför får man inte ändra en befintlig array direkt med t.ex. .push() i React? Hur gör du istället när du lägger till eller tar bort en uppgift?

En array som ligger i React-state ska inte ändras direkt med exempelvis ".push()", eftersom innehållet ändras men referensen till arrayen är densamma.
React kan då missa att en uppdatering behövs om samma array skickas till state-funktionen.
Jag använder istället "[...current, newTodo]" för att lägga till en uppgift och ".filter()" för att ta bort en viklet skapar nya arrayer.

## Kodgranskning

### Ursprunglig kod

```js
function addTodo(todos, text) {
  todos.push(text);
  return todos;
}
```

### Förklaring och förbättring

Koden försöker lägga till en uppgift, men ".push()" ändrar den befintliga arrayen och funktionen returnerar samma referens utan att uppdatera React-state.
Ett bättre sätt är att returnera en ny array och använda "setTodos" för att uppdatera state.

För exemplets lista med texter skulle jag skriva:

```js
function addTodo(todos, text) {
  return [...todos, text];
}

//anropas där react-state hanteras:
setTodos((current) => addTodo(current, text));
```

## Problemlösning & Reflektion

När jag stötte på problem beskrev jag vad som hände och använde tex skärmbilder för att visa hur jag ville att appen skulle fungera.
Ett konkret exempel var att ytterramen i mobilvyn ändrade höjd när jag bläddrade mellan olika långa lappar.
Jag tog då hjälp av AI (chatGPT) för att undersöka layouten och ändra den så att den längsta lappen styrde höjden på ytterramen.
chatGPT hjälpte mig att pinpointa vart problemet var, utan att ändra koden så att jag kunde laborera och ändra detta helt själv, och på så vis ansvarar jag och tar ägande av min kod.
