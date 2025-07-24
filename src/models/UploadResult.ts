import Base from "@/models/Base";

export default class UploadResult extends Base {
  fileName!: string;
  mimeType!: string;
  path!: string;
}
