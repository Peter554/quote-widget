import { html, component, useState, useEffect } from 'haunted'

const quoteURL = 'http://quotes.rest/qod.json?category=inspire'

export const Widget = () => {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(async () => {
    const response = await fetch(quoteURL)
    const json = await response.json()
    const data = json.contents.quotes[0]
    setQuote(data.quote)
    setAuthor(data.author)
  }, [])

  return html`
    ${widgetStyles}
    ${quote && author
      ? html`
          <p class="quote">${quote}</p>
          <p class="author">- ${author}</p>
        `
      : html`
          <p class="loading">
            Just loading your quote...
          </p>
          <div class="loading-spinner">
            ${loading}
          </div>
        `}
  `
}

customElements.define('quote-widget', component(Widget))

const widgetStyles = html`
  <style>
    * {
      box-sizing: border-box;
    }

    :host {
      font-family: var(
        --quote-widget-font-family,
        'Gill Sans',
        'Gill Sans MT',
        Calibri,
        'Trebuchet MS',
        sans-serif
      );
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background-color: var(--quote-widget-background-color, #eee);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p {
      margin: 0;
      font-size: 18px;
      line-height: 1.5rem;
      text-align: center;
    }

    .quote {
      color: var(--quote-widget-quote-color, #000);
    }

    .author {
      margin-top: 1.5rem;
      color: var(--quote-widget-author-color, #666);
      font-style: italic;
    }

    .loading {
    }

    .loading-spinner {
      display: block;
      margin-top: 1rem;
      width: 2rem;
      height: 2rem;
      animation: rotating 2s linear infinite;
    }

    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  </style>
`

const loading = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#666">
    <path
      d="M13.75 22c0 .966-.783 1.75-1.75 1.75s-1.75-.784-1.75-1.75.783-1.75 1.75-1.75 1.75.784 1.75 1.75zm-1.75-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10.75c.689 0 1.249.561 1.249 1.25 0 .69-.56 1.25-1.249 1.25-.69 0-1.249-.559-1.249-1.25 0-.689.559-1.25 1.249-1.25zm-22 1.25c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-8c.551 0 1 .449 1 1 0 .553-.449 1.002-1 1-.551 0-1-.447-1-.998 0-.553.449-1.002 1-1.002zm0 13.5c.828 0 1.5.672 1.5 1.5s-.672 1.501-1.502 1.5c-.826 0-1.498-.671-1.498-1.499 0-.829.672-1.501 1.5-1.501zm-14-14.5c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z"
    />
  </svg>
`
