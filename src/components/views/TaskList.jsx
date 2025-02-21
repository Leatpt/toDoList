import { DeleteOutlined } from "@ant-design/icons";
import { Input, Button, Checkbox, List, Col, Row, Space, Divider } from "antd";
import { produce } from "immer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleNameChange = (task, event) => {
    const newTasks = produce(tasks, (draft) => {
      const index = draft.findIndex((t) => t.id === task.id);
      draft[index].title = event.target.value;
    });
    setTasks(newTasks);

    axios
      .put(
        `${API_URL}/${task.id}`,
        { title: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleCompletedChange = (task, event) => {
    const newTasks = produce(tasks, (draft) => {
      const index = draft.findIndex((t) => t.id === task.id);
      draft[index].marked_as_done = event.target.checked;
    });
    setTasks(newTasks);

    axios
      .put(
        `${API_URL}/${task.id}`,
        { marked_as_done: event.target.checked },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      axios
        .post(
          API_URL,
          { title: newTask },
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        )
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask("");
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    }
  };

  const handleDeleteTask = (task) => {
    axios
      .delete(`${API_URL}/${task.id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== task.id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <Row
      type="flex"
      justify="center"
      style={{ minHeight: "100vh", marginTop: "6rem" }}
    >
      <Col span={12}>
        <div className="flex">
          <h1>Task List</h1>
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
        <Divider />
        <List
          size="small"
          bordered
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item key={task.id}>
              <Row
                type="flex"
                justify="space-between"
                align="middle"
                style={{ width: "100%" }}
              >
                <Space>
                  <Checkbox
                    checked={task.marked_as_done}
                    onChange={(e) => handleCompletedChange(task, e)}
                  />
                  <Input
                    value={task.title}
                    onChange={(event) => handleNameChange(task, event)}
                  />
                </Space>
                <Button type="text" onClick={() => handleDeleteTask(task)}>
                  <DeleteOutlined />
                </Button>
              </Row>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
