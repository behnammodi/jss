const jss = require('jss').default

 // JSS setup.
jss.setup({
  atomic: true
})

const styles = {
  button1: {
    width:'100%',
    height:'100%'
  },
  button2: {
    width:'100%',
    height:'100%'
  }
}

const sheet = jss.createStyleSheet(styles).attach()

//console.log(sheet);