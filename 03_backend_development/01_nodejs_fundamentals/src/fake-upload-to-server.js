import { Readable } from 'node:stream'

class FakeUpload extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 20) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 100)
  }
}

fetch('http://localhost:3333', {
  method: 'POST',
  body: new FakeUpload(),
}).then(res => res.text()).then(text => console.log(text))