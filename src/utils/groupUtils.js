export const groupByTag = (entires) => {
    let tags = {}
    entires.forEach(el => {
      if (el.duration > 0) {
        el.tags.map(t => {
        if (tags[t]) {
          tags[t].value += el.duration
        } else {
          tags[t] = {value: el.duration, name: t}
        }
      })
      }
    });
    return getArray(tags)
  }
  
  export const groupByDescription = (entires) => {
    let desc = {}
    entires.forEach(el => {
      if (el.duration > 0) {
        if (desc[el.description]) {
            desc[el.description].value += el.duration
        } else {
            desc[el.description] = {value: el.duration, name: el.description}
        }
      }
    });
    return getArray(desc)
  }

  const getArray = (map) => {
    let d = []
    Object.keys(map).forEach(k => {
      d.push(map[k])
    })
    return d
  }