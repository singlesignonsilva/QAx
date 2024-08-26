import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTaskByHelper } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'


test('deve poder cadastrar uma nova tarefa', async ({ page, request }) => {

    //massa de testes
    const task = data.success as TaskModel

    //Dado que eu tenha uma nova tarefa
    await deleteTaskByHelper(request, task.name)
    // E que estou na página de cadastro
    const tasksPage: TasksPage = new TasksPage(page) // incrementando a classe criada
    await tasksPage.go()
    //Quando faço o cadastro dessa tarefa
    await tasksPage.create(task)
    //Então essa tarefa deve ser exibida na lista
    await tasksPage.shouldHaveText(task.name)
})

test('não deve permitir duplicidade nas tarefas cadastradas', async ({ page, request }) => {

    //massa de testes
    const task = data.duplicate as TaskModel

    await deleteTaskByHelper(request, task.name)

    await postTaskByHelper(request, task)

    const tasksPage: TasksPage = new TasksPage(page) // incrementando a classe criada
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')


})

test(' campo obrigatório', async ({ page }) => {

    //massa de testes
    const task = data.required as TaskModel

    const tasksPage: TasksPage = new TasksPage(page) // incrementando a classe criada
    await tasksPage.go()
    await tasksPage.create(task)

    //convertendo elemento da página em HML. Messegem de This is a requeired field
    const inputTaskName = page.locator('input[class*=InputNewTask]')
    const validationMessege = await inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessege).toEqual('This is a requeired field')

})

test('deve atualizar uma tarefa', async ({ page, request }) => {
    const task = data.update as TaskModel

    await deleteTaskByHelper(request, task.name)
    await postTaskByHelper(request, task)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.toggle(task.name)

    await tasksPage.shouldBeDone(task.name)
})

test.only('deve excluir uma tarefa', async ({ page, request }) => {
    const task = data.delete as TaskModel

    await deleteTaskByHelper(request, task.name)
    await postTaskByHelper(request, task)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.remove(task.name)

    await tasksPage.shouldBeNoExist(task.name)
})