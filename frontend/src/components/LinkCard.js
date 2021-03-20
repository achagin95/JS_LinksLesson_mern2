import React from 'react'

export const LinkCard = ({ link }) => {
    return (
        <div>
            <h2>Link:</h2>

            <p>Ваша ссылка : <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>

            <p>Откуда ссылка : <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Кол-во кликов : не делал</p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}