import api from "@/service/internal.services";
import { solutionMocks } from "./mocks/solutions.mocks";
import { defaultPassword, usernameMocks } from "./mocks/users.mocks";
import { departmentMocks } from "./mocks/department.mocks";

export const categoryTypes = ["AI Development", "Test Bench Development", "Smart Pairing"];
export const priorityTypes = ["Low", "Medium", "High"];
export const statusTypes = ["On Going", "Completed", "Awaiting", "Idea"];

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function populate() {
    const users = [];

    for (const username of usernameMocks) {
        const { data } = await api.post("/users", { username, password: defaultPassword });
        users.push(data);
    }

    for (const solution of solutionMocks) {
        const { data } = await api.post<{ token: string }>("/auth/login", { 
            username: usernameMocks[0], 
            password: defaultPassword 
        });
        localStorage.setItem("@TOKEN", data?.token!);

        await api.post("/solutions", { 
            description: "A very meaningful description about the solution",
            justification: "A very meaningful justification for the solution",
            orchestration: "A very detailed explanation of how the solution will be implemented",
            userInChargeId: getRandomItem(users).id,
            name: solution,
            clientDepartment: getRandomItem(departmentMocks),
            benefit: getRandomInt(10000, 100000),
            investment: getRandomInt(2000, 15000),
            category: getRandomItem(categoryTypes),
            status: getRandomItem(statusTypes),
            priority: getRandomItem(priorityTypes),
        });
    }

    return { username: usernameMocks[0], password: defaultPassword };
}