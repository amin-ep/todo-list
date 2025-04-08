import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getMyTodos } from "../services/todoApi";
import Heading from "../UI/Heading";
import Highlight from "../UI/Highlight";
import Note from "../UI/Note";
import Subtitle from "../UI/Subtitle";
import classes from "./TodoList.module.css";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const { data, isLoading } = useQuery({
    queryKey: ["myTodos"],
    queryFn: getMyTodos,
  });

  return (
    <div>
      <div className={classes["heading-wrapper"]}>
        <Heading>
          Your <Highlight>Todos</Highlight>
        </Heading>
      </div>
      <ul className={classes.list}>
        {isLoading ? (
          <TodosSkeleton />
        ) : (
          <>
            {data?.data?.length === 0 ? (
              <div className={classes["empty-list-content"]}>
                <Subtitle>You do not have anything to do :/</Subtitle>
                <Note>
                  No tasks? Wow. Teach me your ways, master of peace 😌
                </Note>
              </div>
            ) : (
              <TodoListItem items={data.data} />
            )}
          </>
        )}
      </ul>
    </div>
  );
}

function TodosSkeleton() {
  return (
    <Skeleton
      height={47}
      baseColor="#ffcccb"
      highlightColor="#78cae6"
      count={5}
      borderRadius={4.2}
      enableAnimation={true}
    />
  );
}
