import wrapper from '@pact-foundation/pact-node'

const teardown = async () => {
  wrapper.removeAllServers()
}

module.exports = teardown
