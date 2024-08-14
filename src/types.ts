export type Order = {
    id: number;
    description?: string;
    deliveryConfirmed: boolean;
    paymentRecorded: boolean;
}