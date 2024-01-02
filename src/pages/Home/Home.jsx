// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Container from "../../components/UI/Container";
import TodoList from "../../components/TodoList/TodoList";
function Home() {
  return (
    <Container>
      <TodoList />
    </Container>
  );
}

export default Home;
