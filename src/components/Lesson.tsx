import { format, isPast } from 'date-fns'
import { CheckCircle, Lock } from 'phosphor-react'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'

import classNames from 'classnames';

interface LessonProps {
    title: string
    slug: string
    availableAt: Date
    type: 'live' | 'class'
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
    const { slug: routeSlug } = useParams<{ slug: string }>();
    
    const isLessonAvailable = isPast(availableAt);
    const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
    });

    const isActive = routeSlug === slug;

    return (
        <Link to={`/event/lesson/${slug}`} className="group">
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div
                className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                    'bg-green-500': isActive
                })}
            >
                <header className="flex items-center justify-between">
                    { isLessonAvailable ? (
                        <span
                            className={classNames('text-sm font-medium flex items-center gap-2', {
                                'text-white': isActive,
                                'text-blue-200': !isActive
                            })}
                        >
                            <CheckCircle size={20} />
                            Conteúdo Liberado
                        </span>
                    ) : (
                        <span
                            className={classNames('text-sm font-medium flex items-center gap-2', {
                                'text-white': isActive,
                                'text-orange-200': !isActive
                            })}
                        >
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}
                    <span
                        className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border font-bold', {
                            'border-white': isActive,
                            'border-green-300': !isActive
                        })}
                    >
                        { type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA' }
                    </span>
                </header>

                <strong
                    className={classNames('mt-5 block', {
                        'text-white': isActive,
                        'text-gray-200': !isActive
                    })}
                >
                    {title}
                </strong>
            </div>
        </Link>
    )
  }