import { getContentId, getContentKey } from './util.js'

import type { HistoryNetwork } from './history.js'
import type { HistoryNetworkContentType } from './types.js'
import type { ENR } from '@chainsafe/enr'

type Peer = string

export class GossipManager {
  pulse: number
  history: HistoryNetwork
  gossipQueues: Record<Peer, Uint8Array[]>

  constructor(history: HistoryNetwork) {
    this.pulse = 26
    this.history = history
    this.gossipQueues = {}
  }

  /**
   * @param rate Sets the number of pieces of content that will be offered to each peer (from 1 to 26)
   * @returns The new pulse rate
   */
  public setPulse(rate: number) {
    if (rate > 0 && rate < 27) {
      this.pulse = rate
    }
    return this.pulse
  }

  /**
   * Adds content keys to a given peer's gossip queue
   * @param peer nodeId of a peer to gossip content to
   * @param key content key to be OFFERed
   * @returns the current number of items in a peer's gossip queue
   */
  private enqueue(peer: Peer, key: Uint8Array): number {
    if (this.gossipQueues[peer] === undefined) {
      this.gossipQueues[peer] = []
    }
    if (!this.history.routingTable.contentKeyKnownToPeer(peer, key)) {
      this.gossipQueues[peer].push(key)
    }
    return this.gossipQueues[peer].length
  }

  /**
   * Offers content from a peer's queue to that peer and clears the queue
   * @param peer nodeId of peer being offered content
   */
  private gossip(peer: ENR) {
    const queue = this.gossipQueues[peer.nodeId]
    this.gossipQueues[peer.nodeId] = []
    void this.history.sendOffer(peer, queue)
  }

  /**
   * Adds new content to the gossip queue of the 5 nearest peers
   * @param keyOpt blockHash or blockNumber
   * @param contentType HistoryNetworkContentType
   */
  public add(keyOpt: Uint8Array | bigint, contentType: HistoryNetworkContentType): void {
    const id = getContentId(contentType, keyOpt)
    const key = getContentKey(contentType, keyOpt)
    const peers = this.history.routingTable.nearest(id, 5)
    for (const peer of peers) {
      const size = this.enqueue(peer.nodeId, key)
      if (size >= this.pulse) {
        this.gossip(peer)
      }
    }
  }
}
