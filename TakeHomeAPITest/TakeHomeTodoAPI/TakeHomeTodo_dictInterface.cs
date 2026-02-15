using TakeHomeTodoAPI.Item;

namespace TakeHomeTodoAPI.Dict;

public interface ITHTA_Dict
{
    IEnumerable<THTA_item> GetAll();
    THTA_item Add(string itemDesc);
    bool Delete(Guid itemID);
}