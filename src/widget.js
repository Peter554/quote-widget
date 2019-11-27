import { component, html } from 'haunted'

const Widget = () => {
  return html`
    <p>I'm the quote widget!</p>
  `
}

customElements.define('quote-widget', component(Widget))
