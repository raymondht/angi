import { IFood } from "../models/food";

export abstract class UserService {

  public static SaveMenu(userId: string, menu: IFood[]): void {
    if (localStorage.getItem(userId) == null) {
      const user = {
        menu: menu,
      }
      localStorage.setItem(userId, JSON.stringify(user));
      return;
    }

    const user = JSON.parse(localStorage.getItem(userId)!);
    user['menu'] =  menu;
    localStorage.setItem(userId, JSON.stringify(user));
  }

  public static GetMenu(userId: string): IFood[] | null {
    if (localStorage.getItem(userId) == null) {
      return null;
    }

    const user = JSON.parse(localStorage.getItem(userId)!);
    return user['menu'];
  }

  public static SaveRenewDate(userId: string, renewDate: string): void {
    if (localStorage.getItem(userId) == null) {
      const user = {
        renewDate: renewDate,
      }
      localStorage.setItem(userId, JSON.stringify(user));
      return;
    }

    const user = JSON.parse(localStorage.getItem(userId)!);
    user['renewDate'] =  renewDate;
    localStorage.setItem(userId, JSON.stringify(user));
  }

  public static GetRenewDate(userId: string): string | null {
    if (localStorage.getItem(userId) == null) {
      return null;
    }
    const user = JSON.parse(localStorage.getItem(userId)!);
    return user["renewDate"];
  }

  public static IsMenuSaved(userId: string): boolean {
    if (localStorage.getItem(userId) == null) {
      return false;
    }

    const user = JSON.parse(localStorage.getItem(userId)!);
    return user["menu"] !== undefined || user["menu"] !== null;
  };

  public static ResetListOfCheckedIngredientIds() : void {
    if (localStorage.getItem("1") == null) {
      return;
    }
    this.SaveListOfCheckedIngredientIds("1", [])
  }

  public static GetListOfCheckedIngredientIds(userId: string) : number[] {
    if (localStorage.getItem(userId) == null) {
      return [];
    }
    const user = JSON.parse(localStorage.getItem(userId)!);
    return user["listOfCheckedIngredientIds"] ?? [];
  }

  public static SaveListOfCheckedIngredientIds(userId: string, listOfCheckedIngredientIds: number[] ) : void {
    if (localStorage.getItem(userId) == null) {
      const user = {
        listOfCheckedIngredientIds: listOfCheckedIngredientIds,
      }
      localStorage.setItem(userId, JSON.stringify(user));
      return;
    }

    const user = JSON.parse(localStorage.getItem(userId)!);
    user['listOfCheckedIngredientIds'] =  listOfCheckedIngredientIds;
    localStorage.setItem(userId, JSON.stringify(user));
  }
}