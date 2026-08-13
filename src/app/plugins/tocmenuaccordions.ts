// provide global helpers (functions)

export default defineNuxtPlugin(() => {
  const collapsibleToc = async (hashArr) => {
    // const hashArrOld = [...hashArrayRef.value]
    let ulParent
    // if (navMenuRef.value !== null) ulParent = navMenuRef.value.children[0].children[1].children[0] as HTMLElement

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    let i = 1
    while (ulParent === undefined) {
      await sleep(500)
      ulParent = document.querySelector('nav > div div:nth-child(2) > ul')
      i++
      if (i > 3) {
        console.log('Error: ulParent = undefined - after unsuccessfully trying to catch it tree times!')
        break // prevent eternal loop
      }
    }

    ulParent.setAttribute('class', 'ul_tree')

    // Mark only Lis that actually have a nested UL
    ulParent.querySelectorAll('li').forEach((li) => {
      if (li.querySelector('ul')) {
        li.classList.add('has-children')

        const aLi = li.children[0]
        const aHref = aLi.getAttribute('href')
        if (hashArr.includes(aHref)) {
          li.classList.add('is-open')
        }
      }
    })

    ulParent.addEventListener('click', (e) => {
      const eTarget = e.target as HTMLElement
      const clickedLi = eTarget.closest('li')
      // Only proceed if the clicked item has children
      if (!clickedLi || !clickedLi.classList.contains('has-children')) return

      // Stop the click from bubbling up to parent LIs
      e.stopPropagation()

      const isAlreadyOpen = clickedLi.classList.contains('is-open')

      // ACCORDION: Close all sibling LIs at this specific level
      const siblings = clickedLi.parentElement?.children
      if (siblings !== undefined)
        for (const sibling of siblings)
          sibling.classList.remove('is-open')

      // Toggle the clicked one
      if (!isAlreadyOpen) {
        clickedLi.classList.add('is-open')
      }
    })
  } // End of async collapsibleToc function

  return {
    provide: {
      collapsibleToc: collapsibleToc,
      tocHashArr(lastHash) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hashArr = [] as any
        hashArr.push(lastHash)
        const lastAnchor = document.querySelector(`li > a[href="${lastHash}"]`)
        let currentElement = lastAnchor?.parentElement

        // Loop until there are no more parent elements
        while (currentElement) {
          // Check if the current element is an <li>
          if (currentElement.tagName.toLowerCase() === 'li') {
            const anchor = currentElement.children[0]
            const href = anchor?.getAttribute('href')
            hashArr.push(href)
          }
          // Move up to the next parent
          currentElement = currentElement.parentElement
        }
        return hashArr
      }
    }
  }
})
