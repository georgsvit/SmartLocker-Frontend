import { ServiceNote } from "../domain/service-note";
import { ViolationNote } from "../domain/violation-note";

export class NotificationsDTO {
    public serviceNotes: ServiceNote[];
    public violationNotes: ViolationNote[];
}