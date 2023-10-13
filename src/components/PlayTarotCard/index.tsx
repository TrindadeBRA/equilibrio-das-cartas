import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const mailingLists = [
  { id: 1, title: 'Profissional', value: "professional", description: 'Explore as cartas para orientação sobre sua vida profissional. Descubra insights sobre oportunidades de carreira, desenvolvimento pessoal e sucesso no trabalho. Deixe as cartas do tarot guiá-lo no caminho para alcançar seus objetivos profissionais e atingir seu pleno potencial.' },
  { id: 2, title: 'Amoroso', value: "loving", description: 'Em busca de respostas sobre sua vida amorosa? As cartas do tarot podem oferecer perspectivas sobre relacionamentos existentes, romances futuros e a jornada emocional que você está prestes a embarcar. Permita que as cartas revelem segredos do coração e orientem você no caminho do amor verdadeiro e duradouro.' },
  { id: 3, title: 'Espiritual', value: "spiritual", description: 'Conecte-se com seu eu interior e descubra verdades espirituais profundas. As cartas do tarot podem iluminar sua jornada espiritual, fornecendo insights sobre crescimento pessoal, autoconhecimento e conexão com o universo. Deixe as energias do tarot guiarem você em sua jornada espiritual.' },
  { id: 4, title: 'Financeiro', value: "financial", description: 'Em busca de estabilidade financeira e prosperidade? As cartas do tarot podem revelar padrões em suas finanças, oferecendo conselhos sobre investimentos, planejamento financeiro e oportunidades de crescimento. Deixe as cartas do tarot guiarem suas decisões financeiras e ajude você a alcançar a segurança financeira que deseja.' },
  { id: 3, title: 'Familiar', value: "family", description: 'Suas questões familiares estão causando preocupação? O tarot pode oferecer clareza sobre dinâmicas familiares, comunicação e harmonia no lar. Descubra orientações sobre resolução de conflitos, fortalecimento de laços familiares e criação de um ambiente familiar amoroso e acolhedor.' },
  { id: 3, title: 'Saúde', value: "health", description: 'Sua saúde física e mental é uma prioridade. As cartas do tarot podem oferecer insights sobre seu bem-estar, sugerindo mudanças positivas no estilo de vida, estratégias de gerenciamento do estresse e conselhos sobre autocuidado. Deixe as cartas do tarot orientarem você no caminho para uma vida mais saudável e equilibrada.' },
]


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
