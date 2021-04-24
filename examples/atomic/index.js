const jss = require('jss').default

 // JSS setup.
jss.setup()

console.log('-----------------------------------------------------------------------------------------------');

function Atomic(){
  let count = 0;
  const objects = {};

  const generateAtomicId = () => `a-${count++}`;

  const addStyle = (key, value) => {
    let isNew = false;
    objects[key] = objects[key] || {};
    objects[key][value] = objects[key][value] || (isNew = true, generateAtomicId());
    return {id: objects[key][value], isNew }
  }

  const createAtomicIds = style=>{
    const keys = Object.keys(style)
    console.log({style,keys});
    let ids = ''

    const newRules = {};

    keys.forEach(key=>{
        const {id, isNew} = addStyle(key,style[key])
        if(isNew){
          newRules[id] = { [key]:style[key]}
        }
        ids+= `${id} `
    })

    return {ids, newRules};
  }

  const onCreateStyles=(styles) => {
    // { button1: { width: '100%', height: '100%' } }
    const rules = Object.keys(styles);
    console.log({rules});
    // ['button1']

    for(let i=0; i< rules.length;i++) {
      const {ids, newRules}= createAtomicIds(styles[rules[i]]);
      styles[rules[i]] = ids;
      styles = {...styles,...newRules};
    }

  console.log({objects, styles});

    return styles
  }

  return {onCreateStyles}
}


jss.use(Atomic())

const styles = {
  button1: {
    width:'100%',
    height:'100%'
  },
  button2: {
    width:'100%',
    height:'90%'
  }
}

const sheet = jss.createStyleSheet(styles).attach()

console.log(' ------------------ sheet');
console.log(sheet);
console.log(' ------------------ classes');
console.log(sheet.classes);