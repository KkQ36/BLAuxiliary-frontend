import userData from '@/assets/userData.json'
import { ref } from 'vue'

export class UserService {
  static registers : Array<User> = [];
  public static async login(account?: string, password?: string, invitation?: string) {
    const res = ref(false);
    (userData as User[]).forEach(user => {
      if (user.account === account &&
        user.password === password &&
        user.invitation === invitation) res.value = true;
    });
    (this.registers as User[]).forEach(user => {
      if (user.account == account && user.password == password) res.value = true;
    });
    return res.value;
  }
  public static async register(account: string, password:string) {
    console.log(this.registers);
    (this.registers).push({
      account: account,
      password: password,
      invitation: "",
    })
  }
}

interface User {
  account: string,
  password: string,
  invitation: string
}