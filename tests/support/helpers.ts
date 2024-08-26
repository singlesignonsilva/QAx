import { expect, APIRequestContext } from "@playwright/test"

import { TaskModel } from "../fixtures/task.model"

// funções de custom command para reaproveitamento dos steps
export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
}
export async function postTaskByHelper(request:APIRequestContext, task: TaskModel) {
    const newTask = await request.post('http://localhost:3333/tasks', { data: task })
    expect(newTask.ok()).toBeTruthy()
    
 }