export default () => {
  return (
    <section className={'options' + ' ' + 'border-2 border-grey'}>
      <ul>
        <li className="flex justify-between m-2 py-4 text-left">
          <p className="w-[35%]">精准度: </p>
          <input type="range" min="0" max="100" value="25" class="range range-xs range-accent" step="25" />
        </li>
        <li className="flex justify-between m-2 py-4 text-left">
          <p className="w-[35%]">是否需要翻译</p>
          <input type="checkbox" className="toggle toggle-success" checked />
        </li>
      </ul>
    </section>
  )
}