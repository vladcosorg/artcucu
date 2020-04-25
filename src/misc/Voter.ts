import { auth, likesCollection, firebase, picCollection } from '@/firebase';
import { User } from 'firebase';

class Voter {
  private async getUser(): Promise<User | null> {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(resolve);
    });
  }

  private async getRecordId(itemId: string) {
    const user = await this.getUser();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return `${user!.uid}_${itemId}`;
  }

  private async getRecord(itemId: string) {
    return (await this.getDoc(itemId)).get();
  }

  private async getDoc(itemId: string) {
    return likesCollection.doc(await this.getRecordId(itemId));
  }

  private async incrementVote(itemId: string, value = 1) {
    const decrement = firebase.firestore.FieldValue.increment(value);
    return picCollection.doc(itemId).set({ likes: decrement }, { merge: true });
  }

  public async getVoteStatus(itemId: string) {
    const record = await this.getRecord(itemId);
    return record.exists;
  }

  public async toggle(itemId: string) {
    const doc = await this.getDoc(itemId);
    const record = await doc.get();
    if (record.exists) {
      doc.delete();
      this.incrementVote(itemId, -1);
    } else {
      const user = await this.getUser();
      doc.set({
        picId: itemId,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: user!.uid,
      });
      this.incrementVote(itemId, 1);
    }

    return !record.exists;
  }
}

export default new Voter();
