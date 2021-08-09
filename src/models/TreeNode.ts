import {Category} from 'src/models/Category';

export class TreeNode {

  public label: string;
  public data: string;
  public expandedIcon: string;
  public collapsedIcon: string;
  public children: TreeNode[];

  public id: number;
  public category: Category;

  constructor(label: string, data: string, expandedIcon: string, collapsedIcon: string,
              children: Category[], id: number, category: Category) {

    this.id = id;
    this.label = label;
    this.data = data;
    this.expandedIcon = expandedIcon;
    this.collapsedIcon = collapsedIcon;
    this.category = category;
    this.children = children.map((data) => this.fromComposit(data));
  }

  public fromComposit(composit: Category): TreeNode {
    return new TreeNode(composit.getName(), composit.getName(), 'pi pi-folder-open', 'pi pi-folder-open',
      composit.children, composit.id, composit);
  }


  public findElementById(id: number): TreeNode {
    if (this.id == id) {
      return this;
    } else if (this.children != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < this.children.length; i++) {
        result = this.children[i].findElementById(id);
      }
      return result;
    }
    return null;
  }
}


