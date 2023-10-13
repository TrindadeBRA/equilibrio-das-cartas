import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const mailingLists = [
  { id: 1, title: 'Profissional', value: "professional", description: 'Orientação sobre carreira, desenvolvimento pessoal e sucesso no trabalho.' },
  { id: 2, title: 'Amoroso', value: "loving", description: 'Perspectivas sobre relacionamentos existentes, romances futuros e a jornada emocional no amor.' },
  { id: 3, title: 'Espiritual', value: "spiritual", description: 'Insights sobre crescimento pessoal, autoconhecimento e conexão com o universo.' },
  { id: 4, title: 'Financeiro', value: "financial", description: 'Revela padrões financeiros, oferece conselhos sobre investimentos e planejamento financeiro.' },
  { id: 5, title: 'Familiar', value: "family", description: 'Clareza sobre dinâmicas familiares, comunicação e harmonia no lar.' },
  { id: 6, title: 'Saúde', value: "health", description: 'Oferece conselhos sobre bem-estar físico e mental, estratégias de gerenciamento do estresse e autocuidado.' },
];



function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function PlayTarotCard() {
  const [selectedMailingLists, setSelectedMailingLists]:any = useState(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (typeof selectedMailingLists?.value === 'string') {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [selectedMailingLists]);

  const router = useRouter();

  const handleLogSelected = () => {
    console.log('Valor selecionado:', selectedMailingLists?.value);
    router.push({
      pathname: '/carta-sorteada',
      query: { themeReading: selectedMailingLists?.value },
    });
  };
  
  


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
                  active ? 'border-[#da18ff] ring-2 ring-[#da18ff]' : 'border-gray-300',
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
                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-[#da18ff]')}
                    aria-hidden="true"
                  />
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-[#da18ff]' : 'border-transparent',
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
        <button onClick={handleLogSelected} className="bg-[#da18ff] hover:bg-[#9e30b4] text-white font-bold py-2 px-4 rounded mt-4">
          Sortear carta
        </button>
      )}
    </>
  )
}
