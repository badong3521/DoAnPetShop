export class EntityNotFound extends Error {
  constructor(entity?: string, id?: string) {
    super(
      `${entity ?? 'Thực thể'} ${id ? `with id ${id}` : ''} không tìm thấy`,
    );
  }
}
