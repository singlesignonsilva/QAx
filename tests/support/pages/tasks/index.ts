
import { Page, expect} from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"

export class TasksPage{
    readonly page:Page  ///propriedade somente de leitura para dar acesso ao navegador

    constructor(page: Page){
        this.page = page
    }

    async go(){
        await this.page.goto('http://localhost:8080/')
    }

    async create(task: TaskModel){
        const inputTaskName = this.page.locator('input[class*=InputNewTask]')
        await inputTaskName.fill(task.name)
    
        await this.page.click('css=button >> text=Create')
    }

    async shouldHaveText(taskName: string){
        const target = this.page.locator('css=.task-item p >> text=' + taskName)
        await expect(target).toHaveText(taskName)

    }

    async alertHaveText(text: string){
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async shouldBeDone(taskName: string){
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

    async toggle (taskName: string){
        const target = this.page.locator('xpath=//p[text()="Pagar fatura do cartão de crédito"]/..//button[contains(@class, "Toggle")]')
        await target.click()

    }

    async remove (taskName: string){
        const target = this.page.locator('//p[text()="Testes em RUBY"]/..//button[contains(@class, "DeleteButton")]')
        await target.click()
    }

    async shouldBeNoExist(taskName: string){
        const target = this.page.locator('css=.task-item p >> text=' + taskName)
        await expect(target).not.toBeVisible()
    }



  
}
