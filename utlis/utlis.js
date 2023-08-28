export const MarkAsDone = () => {

}

export const CreateAgendaCard = (text) => {
    let newCard = document.createElement('div')
    let newCardTxt = document.createElement('h4')
    newCard.classList.add('agenda_card')
    newCard.title = text
    newCardTxt.classList.add('agenda_txt')
    newCardTxt.textContent = text
    newCard.append(newCardTxt)
    return newCard
}