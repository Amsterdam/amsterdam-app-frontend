import {removeItemFromArray} from '@/utils/removeItemFromArray'

describe('removeItemFromArray', () => {
  it('should remove an existing item from the array', () => {
    const draft = ['a', 'b', 'c']

    removeItemFromArray(draft, 'b')
    expect(draft).toEqual(['a', 'c'])
  })

  it('should not modify the array if the item does not exist', () => {
    const draft = ['a', 'b', 'c']

    removeItemFromArray(draft, 'd')
    expect(draft).toEqual(['a', 'b', 'c'])
  })

  it('should handle removing the first item', () => {
    const draft = ['a', 'b', 'c']

    removeItemFromArray(draft, 'a')
    expect(draft).toEqual(['b', 'c'])
  })

  it('should handle removing the last item', () => {
    const draft = ['a', 'b', 'c']

    removeItemFromArray(draft, 'c')
    expect(draft).toEqual(['a', 'b'])
  })

  it('should work with numbers', () => {
    const draft = [1, 2, 3, 4]

    removeItemFromArray(draft, 3)
    expect(draft).toEqual([1, 2, 4])
  })
})
