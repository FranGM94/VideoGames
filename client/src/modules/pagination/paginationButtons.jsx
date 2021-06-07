export function PaginationButtonsComponent(props) {
    return (
        <div className="gamelist__pagination-buttons">
            <button value="prev" onClick={props.handleClick} disabled={props.disabledPrev && 'disabled'}> ❮ </button>
            <button value="next" onClick={props.handleClick} disabled={props.disabledNext && 'disabled'}> ❯ </button>
        </div>
    )
}