import { formatDate, getErrorCode } from '../src/helpers';


describe('helpers', () => {
  describe('formatDate', () => {
    it('Should format date...', () => {
      // Given
      const input = '20190328';
      // When
      const result = formatDate(input);
      // Then
      expect(result).toBe('2019-03-28');
    });
  });


  describe('getErrorCode', () => {
    it('Should find an errorcode', () => {
      // Given
      const req = { query: { prenoms: 'test_123' } };
      const errors = ['123', '456'];
      // When
      const result = getErrorCode(req, errors);
      // Then
      expect(result).toBe('123');
    });

    it('Should return false if no errorcode detected', () => {
      // Given
      const req = { query: { prenoms: 'test' } };
      const errors = ['123', '456'];
      // When
      const result = getErrorCode(req, errors);
      // Then
      expect(result).toBe(false);
    });

    it('Should return false if error code is not referenced', () => {
      // Given
      const req = { query: { prenoms: 'test_789' } };
      const errors = ['123', '456'];
      // When
      const result = getErrorCode(req, errors);
      // Then
      expect(result).toBe(false);
    });
  });
});
