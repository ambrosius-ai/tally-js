// import { describe, it, expect } from 'vitest'
// import { TallyClient } from '../client'


// describe('TallyClient', () => {
//   it('should create an instance with an API key', () => {
//     const client = new TallyClient('test-key', 'https://api.tally.so')
//     expect(client.#apiKey).toBe('test-key')
//   })

//   it('should handle empty API key', () => {
//     const client = new TallyClient('')
//     expect(client.#apiKey).toBe('')
//   })

//   it('should handle API key with special characters', () => {
//     const specialKey = '!@#$%^&*()_+-=[]{}|;:,.<>?'
//     const client = new TallyClient(specialKey)
//     expect(client.#apiKey).toBe(specialKey)
//   })

//   it('should maintain separate API keys for different instances', () => {
//     const client1 = new TallyClient('key1')
//     const client2 = new TallyClient('key2')

//     expect(client1.#apiKey).toBe('key1')
//     expect(client2.#apiKey).toBe('key2')
//     expect(client1.#apiKey).not.toBe(client2.#apiKey)
//   })
// })
