export default function defineComputation(HL, hairline) {
  const { Cam, fit, proj, facing, rings, prism, solid, put, open, mk, clamp, spring, stepS, register, pointer, disposer } = HL

  function mount({ stage, svg, read }, value) {
    const bag = disposer()
    const camera = Cam(45, .5, 1.84)
    fit(camera, [[-89, -51, 0], [88, 51, 0], [-48, -55, 105], [63, 47, 100]], 200, 166)
    const P = proj(camera)
    const front = facing(camera)
    const spread = spring(15)
    const boards = Array.from({ length: 3 }, () => {
      const layer = mk('g', {}, svg)
      return {
        board: solid(layer),
        chip: solid(layer),
        traces: mk('path', { class: 'lo nf' }, layer),
        ports: mk('path', { class: 'lo nf' }, layer)
      }
    })
    let pointerX = null
    let reach = value
    let drawn

    function draw() {
      if (spread.x === drawn) return
      drawn = spread.x
      boards.forEach(({ board, chip, traces, ports }, i) => {
        const dx = (i - 1) * drawn * .62
        const z = i * (13 + drawn * .6)
        const local = (x, y, height) => P(x + dx, y, height + z)
        put(board, prism(local, front, ...rings(-56, -37, 56, 37, 8, 2), 0, 5))
        put(chip, prism(local, front, ...rings(-23 + i * 7, -12, 16 + i * 7, 13, 4, 1.4), 5, 12))
        chip.sil.classList.toggle('hi', i === 2)
        traces.setAttribute('d', [-2, 6, 14].map(y => open([local(-42, y, 5), local(-33, y, 5), local(-29, y - 4, 5)])).join(' '))
        ports.setAttribute('d', [-32, -18, -4, 10, 24, 38].map(x => open([local(x, 32, 5), local(x + 5, 32, 5)])).join(' '))
      })
    }
    const loop = register(stage, dt => {
      const moving = stepS(spread, dt)
      draw()
      return moving
    })
    function aim() {
      spread.t = pointerX === null ? 15 : 8 + clamp((pointerX - 62) / 275, 0, 1) * reach
      read.textContent = pointerX === null ? 'rest' : 'layers'
      loop.wake()
    }
    bag.add(loop.unregister)
    bag.add(pointer(stage, {
      move: ([x]) => { pointerX = x; aim() },
      leave: () => { pointerX = null; aim() }
    }))
    bag.add(() => svg.replaceChildren())
    read.textContent = 'rest'
    draw()
    return { set: v => { reach = v; aim() }, destroy: bag.dispose }
  }

  hairline({ name: 'computation', means: 'Three circuit boards spread apart to reveal their layers as the pointer moves across them.', rules: [1, 3, 5, 6, 9], range: [17, 32, 49], tour: [[94, 162], [198, 158], [310, 154], null], mount })
}
