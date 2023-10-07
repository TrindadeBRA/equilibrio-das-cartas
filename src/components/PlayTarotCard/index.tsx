import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const mailingLists = [
  { id: 1, title: 'Profissional', value: "professional", description: 'Lorem ipsum del aqua.' },
  { id: 2, title: 'Amoroso', value: "loving", description: 'Lorem ipsum del aqua.' },
  { id: 3, title: 'Espiritual', value: "spiritual", description: 'Lorem ipsum del aqua.' },
  { id: 4, title: 'Financeiro', value: "financial", description: 'Lorem ipsum del aqua.' },
  { id: 3, title: 'Familiar', value: "family", description: 'Lorem ipsum del aqua.' },
  { id: 3, title: 'Saúde', value: "health", description: 'Lorem ipsum del aqua.' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PlayTarotCard() {
  const [selectedMailingLists, setSelectedMailingLists] = useState(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    console.log('Valor selecionado:', selectedMailingLists?.value);
    // Ajustar, quando o radio é pressionado deve aparecer o botao
    if (typeof selectedMailingLists?.value === 'string') {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [selectedMailingLists]);
  


  return (
    <>
      <RadioGroup value={selectedMailingLists} onChange={setSelectedMailingLists}>
        <RadioGroup.Label className="text-3xl font-semibold leading-6 py-8 block text-gray-900">
          De qual tema você tem interesse em saber mais?
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          {mailingLists.map((mailingList) => (
            <RadioGroup.Option
              key={mailingList.id}
              value={mailingList}
              className={({ active }) =>
                classNames(
                  active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300',
                  'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                        {mailingList.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                        {mailingList.description}
                      </RadioGroup.Description>
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                    aria-hidden="true"
                  />
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-600' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      {showButton && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Meu Botão
        </button>
      )}
    </>
  )
}
