import { useState } from 'react';

interface Props {
  lang?: 'it' | 'en';
}

export default function ContactForm({ lang = 'it' }: Props) {
  const isIT = lang === 'it';
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      messaggio: (form.elements.namedItem('messaggio') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full bg-deep-space-blue-800/60 border border-parchment-50/15 text-parchment-50 placeholder-parchment-300/40 px-4 py-3.5 rounded-sm text-base focus:outline-none focus:border-golden-bronze-500/60 transition-colors duration-200 font-body';

  const labelClass = 'block text-parchment-200 text-sm font-medium mb-2 font-body';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nome" className={labelClass}>
            {isIT ? 'Nome *' : 'Name *'}
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            placeholder={isIT ? 'Il tuo nome' : 'Your name'}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={isIT ? 'la-tua@email.com' : 'your@email.com'}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="telefono" className={labelClass}>
          {isIT ? 'Telefono' : 'Phone'}
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          placeholder="+39 000 000 0000"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="messaggio" className={labelClass}>
          {isIT ? 'Messaggio *' : 'Message *'}
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          required
          rows={5}
          placeholder={
            isIT
              ? 'Descrivi il tuo viaggio: date, numero di persone, partenza, destinazione...'
              : 'Describe your trip: dates, number of people, departure, destination...'
          }
          className={inputClass + ' resize-none'}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="cta-fly cta-fly--primary cta-fly--lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="cta-fly-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/>
            </svg>
          </span>
          <span className="cta-fly-label">
            {status === 'sending'
              ? isIT ? 'Invio in corso...' : 'Sending...'
              : isIT ? 'Invia richiesta' : 'Send Request'}
          </span>
        </button>

        {status === 'success' && (
          <p className="text-green-400 text-sm font-medium">
            {isIT ? '✓ Messaggio inviato! Ti risponderemo entro 24 ore.' : '✓ Message sent! We\'ll reply within 24 hours.'}
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm font-medium">
            {isIT ? 'Errore nell\'invio. Riprova o contattaci su WhatsApp.' : 'Send error. Retry or contact us on WhatsApp.'}
          </p>
        )}
      </div>
    </form>
  );
}
